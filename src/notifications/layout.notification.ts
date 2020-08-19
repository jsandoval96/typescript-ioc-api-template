export class Layout {
  private logoUrl = 'My logo';

  private copyright = 'copyright 2020';

  private footer (): string {
    return `
      <div style="margin: auto;width: 50%;padding: 10px;text-align: center;">
        ${this.copyright}
      </div>
      `;
  }

  private header (): string {
    return `
      <div style="margin: auto;width: 50%;padding: 10px;text-align: center;">
        <img src="${this.logoUrl}" width="150"></img>
      </div>
      `;
  }

  public template (content: string): string {
    return `
      <html>
        <head>
          <title>Casayauto.com</title>
          <style>
            @media (min-width: 600px) {
              .spacing {
                margin: auto;
                width: 50%;
              }
            }
          </style>
        </head>
        <body>
          ${this.header()}
          <div style="background: #F1F1F1;padding: 15px;">
            <div class="spacing" style="background: white;padding: 10px;">
              ${content}
            </div>
          </div>
          ${this.footer()}
        </body>
      </html>
      `;
  }
}
