import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Int "mo:core/Int";

actor {
  var playerStress = 0;
  var currentScene : Text = "intro";
  var hasKeycard = false;
  var hasFoundCode = false;
  var isInSaveSpot = false;
  var doorsBarricaded : [Text] = [];

  public query ({ caller }) func getPlayerState() : async (
    playerStress : Nat,
    currentScene : Text,
    hasKeycard : Bool,
    hasFoundCode : Bool,
    isInSaveSpot : Bool,
    doorsBarricaded : [Text],
  ) {
    (playerStress, currentScene, hasKeycard, hasFoundCode, isInSaveSpot, doorsBarricaded);
  };

  public shared ({ caller }) func updateStress(amount : Int) : async () {
    if (amount > 0) {
      playerStress += amount.toNat();
    } else {
      let absAmount = (-amount).toNat();
      if (playerStress >= absAmount) {
        playerStress -= absAmount;
      } else {
        playerStress := 0;
      };
    };
  };

  public shared ({ caller }) func setScene(scene : Text) : async () {
    currentScene := scene;
  };

  public shared ({ caller }) func findKeycard() : async () {
    hasKeycard := true;
  };

  public shared ({ caller }) func findCode() : async () {
    hasFoundCode := true;
  };

  public shared ({ caller }) func enterSaveSpot() : async () {
    isInSaveSpot := true;
  };

  public shared ({ caller }) func exitSaveSpot() : async () {
    isInSaveSpot := false;
  };

  public shared ({ caller }) func barricadeDoor(doorId : Text) : async () {
    let alreadyBarricaded = doorsBarricaded.find(func(d) { d == doorId }) != null;
    if (alreadyBarricaded) {
      Runtime.trap("Door is already barricaded.");
    };
    doorsBarricaded := doorsBarricaded.concat([doorId]);
  };

  public shared ({ caller }) func unbarricadeDoor(doorId : Text) : async () {
    let isBarricaded = doorsBarricaded.find(func(d) { d == doorId }) != null;
    if (not isBarricaded) {
      Runtime.trap("Door is not barricaded.");
    };
    let filteredDoors = doorsBarricaded.filter(func(d) { d != doorId });
    doorsBarricaded := filteredDoors;
  };
};
