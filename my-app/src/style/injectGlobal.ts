import { DIMENS } from "./dimens";

import { css } from "@emotion/core";
const IE_MARGIN_MIN: number = 8;
// tslint:disable-next-line:no-unused-expression
export const globalCss = css`
  html,
  body,
  #root {
    height: 100%;
    margin: 0;
  }

  body {
    box-sizing: border-box;
    font-family: -apple-system, Arial, "Helvetica Neue", Helvetica, "Hiragino Maru Gothic W4 JIS2004", "ヒラギノ角ゴ ProN W3",
      "Hiragino Kaku Gothic ProN", "メイリオ", Meiryo, sans-serif;
    margin: ${DIMENS.X0};
    padding: ${DIMENS.X0};
  }

  div,
  p,
  ul,
  ol,
  li,
  dl,
  dt,
  dd,
  h1,
  h2,
  h3 {
    box-sizing: border-box;
    margin: ${DIMENS.X0};
    padding: ${DIMENS.X0};
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  button {
    padding: 0;
    border: none;
  }
  input[type="checkbox"] {
    margin: ${DIMENS.X0};
  }

  /* ポップアップの色を変更できるようにするため, currentColorを指定する。色を変更する時は親要素のcolorを指定して色を変更する */
  /* https://github.com/littlebits/react-popover#examples */
  .Popover-tip {
    fill: currentColor;
  }

  /* paper.css */
  /* https://github.com/cognitom/paper-css */
  @font-face {
    font-family: IPAexGothic;
    src: url("./fonts/ipag.woff");
  }
  /* @page { margin: 0 } */
  #print {
    margin: 0;
    font-family: "IPAexGothic", sans-serif;
  }
  .sheet {
    margin: 0;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    page-break-after: always;
  }

  /** Paper sizes **/
  #print.A3 .sheet {
    width: ${297 - IE_MARGIN_MIN}mm;
    height: ${419 - IE_MARGIN_MIN}mm;
  }
  #print.A3.landscape .sheet {
    width: 420mm;
    height: 296mm;
  }
  #print.A4 .sheet {
    width: 210mm;
    height: 296mm;
  }
  #print.A4.landscape .sheet {
    width: 297mm;
    height: 209mm;
  }
  #print.A5 .sheet {
    width: 148mm;
    height: 209mm;
  }
  #print.A5.landscape .sheet {
    width: 210mm;
    height: 147mm;
  }
  #print.letter .sheet {
    width: 216mm;
    height: 279mm;
  }
  #print.letter.landscape .sheet {
    width: 280mm;
    height: 215mm;
  }
  #print.legal .sheet {
    width: 216mm;
    height: 356mm;
  }
  #print.legal.landscape .sheet {
    width: 357mm;
    height: 215mm;
  }

  /** Padding area **/
  .sheet.padding-10mm {
    padding: 10mm;
  }
  .sheet.padding-15mm {
    padding: 15mm;
  }
  .sheet.padding-20mm {
    padding: 20mm;
  }
  .sheet.padding-25mm {
    padding: 25mm;
  }

  /** For screen preview **/
  @media screen {
    body {
      background: #e0e0e0;
      height: 100%;
    }
    .sheet {
      background: #ffffff;
      margin: 0 auto;
      padding: 5mm 0;
    }
    .sheet:not(:last-child) {
      margin-bottom: ${DIMENS.X18};
    }
  }

  /** Fix for Chrome issue #273306 **/
  @media print {
    #print.A3.landscape {
      width: 420mm;
    }
    #print.A3,
    #print.A4.landscape {
      width: ${297 - IE_MARGIN_MIN}mm;
    }
    #print.A4,
    #print.A5.landscape {
      width: 210mm;
    }
    #print.A5 {
      width: 148mm;
    }
    #print.letter,
    #print.legal {
      width: 216mm;
    }
    #print.letter.landscape {
      width: 280mm;
    }
    #print.legal.landscape {
      width: 357mm;
    }
  }
`;
