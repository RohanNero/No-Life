const intro = [
  "The Phygital Actuation has been realized! This is catastrophic! Reality as we know it has been altered, or should I say encoded! We need your help, Anon. The entire laboratory is in chaos, and many of our scientists are trapped. You're our only hope. Please, hurry and save `DoctorMorris` before it's too late! (Use the Hex Converter to encode strings, then pass the output to your Coding Ray)",
];
const one = [
  "Good job, you've saved `DoctorMorris`! But don't stop now, I see `DoctorKeller` has been encoded by the blast as well!",
];
const two = [
  "Oh no the horror! `DoctorTom` and `DoctorJerry` were in physical contact during the cataclysm and have been encoded together! You must figure out a way to save them!",
];
const three = [
  "Thank god for your quick thinking! That must've been an awful experience for those two. Now we've lost connection to the main power supply and must manually override the door's locks without the use of our credentials. If I remember correctly these normal containment doors decode into only a single string. EMERGENCY KEY: `0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001b5468652070617373776f726420697320606c616e64736861726b600000000000` (The Coding Ray input must be encoded to work)",
];
const four = [
  "Nice, so far you've figured out how to decode bytes and encode strings! There's another locked door but I'm sure you'll be able to get us through in no time! EMERGENCY KEY: `0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000195468652070617373776f72642069732060736561626561726000000000000000`",
];
const five = [
  "Watch out, it's some sort of monster! It appears to be a `rabidFerris`! It must've been released during the Phygital Actuation, blast it quickly!",
];
const six = [
  "Ok I think it's dead. We've reached the final door in the Future-Block-Mana-Extraction wing! We need to get out here as soon as possible, this is probably the most dangerous place in the entire lab since its where the failed experiment originated EMERGENCY KEY: `0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000305468652070617373776f726473206172653a20274c696d61272c20274b696c6f272c20616e6420274a756c696574272e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002b20596f75206d75737420656e746572207468656d20696e20616c7068616265746963616c206f726465722e000000000000000000000000000000000000000000` (Data that needs to be decoded may contain more than one string)",
];
const seven = [
  "< LEVEL 00 COMPLETED > | We've made it out of the FBME wing, the only way to get to the exit is by passing through the Packaging Plant- AHHHHHH WATCH OUT ANOTHER ONE OF THOSE `rabidFerris` MONSTERS!",
];
const eight = [
  "Thanks, that was a close one. Wait do you hear that? Jesus look! `DoctorPotter`, `DoctorWeasley`, and `DoctorGranger` have been fused together as well! We must help them!",
];
// const nine = [
//   "Ok Here's the entrance to the Packaging Plant! EMERGENCY KEY: `0x656e636f6465` We won't be able to use our decoder since it's been `abi.encodePacked`. (a=61, b=62, c=63...)",
// ];
// const ten = [];
// const eleven = [];
// const twelve = [];
// const thirteen = [];
// const fourteen = [];

export const dialogue = [
  intro,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  // nine,
  // ten,
  // eleven,
  // twelve,
  // thirteen,
  // fourteen,
];

module.exports = { dialogue };
