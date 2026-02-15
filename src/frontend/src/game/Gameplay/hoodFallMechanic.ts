import * as THREE from 'three';

export interface HoodFallConfig {
  reactionWindow: number; // milliseconds
  stressPenalty: number;
  lookThreshold: number; // dot product threshold for "looking at"
}

export const DEFAULT_HOOD_FALL_CONFIG: HoodFallConfig = {
  reactionWindow: 2000,
  stressPenalty: 15,
  lookThreshold: 0.7
};

export function isLookingAt(
  cameraPosition: THREE.Vector3,
  cameraDirection: THREE.Vector3,
  targetPosition: THREE.Vector3,
  threshold: number = 0.7
): boolean {
  const toTarget = new THREE.Vector3()
    .subVectors(targetPosition, cameraPosition)
    .normalize();
  
  const dot = cameraDirection.dot(toTarget);
  return dot > threshold;
}

export class HoodFallEvent {
  private startTime: number;
  private config: HoodFallConfig;
  private resolved: boolean = false;

  constructor(config: HoodFallConfig = DEFAULT_HOOD_FALL_CONFIG) {
    this.startTime = Date.now();
    this.config = config;
  }

  checkLooking(
    cameraPosition: THREE.Vector3,
    cameraDirection: THREE.Vector3,
    enemyPosition: THREE.Vector3
  ): { shouldPenalize: boolean; isExpired: boolean } {
    if (this.resolved) {
      return { shouldPenalize: false, isExpired: true };
    }

    const elapsed = Date.now() - this.startTime;
    const isExpired = elapsed > this.config.reactionWindow;

    if (isExpired) {
      this.resolved = true;
      return { shouldPenalize: false, isExpired: true };
    }

    const looking = isLookingAt(
      cameraPosition,
      cameraDirection,
      enemyPosition,
      this.config.lookThreshold
    );

    if (looking) {
      this.resolved = true;
      return { shouldPenalize: true, isExpired: false };
    }

    return { shouldPenalize: false, isExpired: false };
  }

  getStressPenalty(): number {
    return this.config.stressPenalty;
  }
}
