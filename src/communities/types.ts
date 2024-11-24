export interface Attestation {
    recipient: string;
    attester: string;
    ensName?: string | null;
  }
  
  export interface AttestationResponse {
    data: {
      attestations: Attestation[];
    };
  }