export interface Attestation {
    recipient: string;
    attester: string;
  }
  
  export interface AttestationResponse {
    data: {
      attestations: Attestation[];
    };
  }