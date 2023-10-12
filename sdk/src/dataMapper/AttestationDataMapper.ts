import BaseDataMapper from "./BaseDataMapper";
import { Attestation } from "../types";
import { Constants } from "../utils/constants";
import { Attestation_filter, Attestation_orderBy, execute, OrderDirection } from "../../.graphclient";
import { gql } from "@apollo/client/core";

export default class AttestationDataMapper extends BaseDataMapper<Attestation> {
  typeName = "attestation";
  gqlInterface = `{
            id
            schemaId
            replacedBy
            attester
            portal
            attestedDate
            expirationDate
            revocationDate
            version
            revoked
            subject
            attestationData
            schemaString
            decodedData
  }`;

  async getRelatedAttestations(id: string) {
    return this.findBy({
      attestationData_contains: id,
      schemaId_in: [Constants.RELATIONSHIP_SCHEMA_ID, Constants.NAMED_GRAPH_RELATIONSHIP_SCHEMA_ID],
    });
  }

  async getAttestations(
    first?: number,
    skip?: number,
    where?: Attestation_filter,
    orderBy?: Attestation_orderBy,
    orderDirection?: OrderDirection,
  ) {
    const myQuery = gql`
      query GetAttestations(
        $first: Int = 100
        $skip: Int = 0
        $where: Attestation_filter = null
        $orderBy: Attestation_orderBy = null
        $orderDirection: OrderDirection = null
      ) {
        attestations(
          first: $first
          skip: $skip
          where: $where
          orderBy: $orderBy
          orderDirection: $orderDirection
          block: $block
        ) {
          id
          schemaId
          replacedBy
          attester
          portal
          attestedDate
          expirationDate
          revocationDate
          version
          revoked
          subject
          attestationData
          schemaString
          decodedData
        }
      }
    `;

    const result = await execute(myQuery, {
      first: first,
      skip: skip,
      where: where,
      orderBy: orderBy,
      orderDirection: orderDirection,
    });

    if (result.errors) {
      throw new Error("Error(s) while fetching Attestations");
    }

    return result.data.attestations;
  }
}
