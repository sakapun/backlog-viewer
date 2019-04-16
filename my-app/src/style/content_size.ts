import { DIMENS } from "./dimens";

export const EMPTY_HEADER_HEIGHT = "34px";

// 検索ボックスの高さ
export const SEARCH_BOX_HEIGHT = "36px";
export const SEARCH_BOX_HEIGHT_WITH_MARGIN = `calc(${SEARCH_BOX_HEIGHT} + ${DIMENS.X1})`;
// タグの高さ
export const LEFT_PANE_TAB_HEIGHT = "35px";
export const LEFT_PANE_TAB_HEIGHT_WITH_MARGIN = `calc(${LEFT_PANE_TAB_HEIGHT} + ${DIMENS.X1})`;

export const PANE_HEADER_HEIGHT = "32px";
export const RIGHT_PANE_HEADER_HEIGHT = "52px";
export const RIGHT_PANE_HEADER_HEIGHT_WITH_MARGIN = `(${RIGHT_PANE_HEADER_HEIGHT} + ${DIMENS.X2} + 3px)`; // 3pxはボーダー
export const RIGHT_PANE_CONTENTS_HEIGHT = `calc(100% - ${PANE_HEADER_HEIGHT} - ${RIGHT_PANE_HEADER_HEIGHT_WITH_MARGIN})`;
