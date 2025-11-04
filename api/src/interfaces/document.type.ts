export interface DocumentRequest {
  clientName: string;
  clientUrl: string;
  cardNumber: string;
  central: Array<{
    typeCentral: string;
    url: string;
  }>;
  testMode: boolean;
  actionUrl: boolean;
  integration: boolean;
  callHistory: boolean;
  implantationWebView: boolean;
  implantationScript: boolean;
}