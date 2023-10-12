import VeraxSdk from "../../src/VeraxSdk";

export default class AttestationExamples {
  private veraxSdk: VeraxSdk;

  constructor(_veraxSdk: VeraxSdk) {
    this.veraxSdk = _veraxSdk;
  }

  async run(methodName: string = "") {
    if (methodName.toLowerCase() == "findOneById".toLowerCase() || methodName == "") {
      console.log(
        await this.veraxSdk.attestation.findOneById(
          "0x00000000000000000000000000000000000000000000000000000000000007b5",
        ),
      );
    }

    if (methodName.toLowerCase() == "findBy".toLowerCase() || methodName == "") {
      console.log(
        await this.veraxSdk.attestation.findBy({
          schemaId: "0xd1664d97bd195df77e3d5fe78c1737ab3adaa38bbe52a680d1aa30fa51f186ba",
        }),
      );
    }

    if (methodName.toLowerCase() == "getRelatedAttestations".toLowerCase() || methodName == "") {
      console.log(
        await this.veraxSdk.attestation.getRelatedAttestations(
          "0x0000000000000000000000000000000000000000000000000000000000000001",
        ),
      );
    }

    if (methodName.toLowerCase() == "getAttestations".toLowerCase() || methodName == "") {
      console.log(
        await this.veraxSdk.attestation.getAttestations(
          2,
          0,
          { attester_not: "0x809e815596AbEB3764aBf81BE2DC39fBBAcc9949" },
          "attestedDate",
          "desc",
        ),
      );
    }
  }
}
