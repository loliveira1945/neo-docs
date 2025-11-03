export interface DocumentRequest {
  clientName: string;
  cardNumber: string;
  central: Array<{
    typeCentral: string;
    url: string;
  }>;
  testMode: boolean;
  actionUrl: boolean;
  integration: boolean;
  tokenJWT: boolean;
  sendToken: boolean;
  implantationWebView: boolean;
  implantationScript: boolean;
}