/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Close_Detail_PopupInputs */

const en_knowledge_close_detail_popup = /** @type {(inputs: Knowledge_Close_Detail_PopupInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close detail popup`)
};

const zh_knowledge_close_detail_popup = /** @type {(inputs: Knowledge_Close_Detail_PopupInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭详情弹窗`)
};

/**
* | output |
* | --- |
* | "Close detail popup" |
*
* @param {Knowledge_Close_Detail_PopupInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_close_detail_popup = /** @type {((inputs?: Knowledge_Close_Detail_PopupInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Close_Detail_PopupInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_close_detail_popup(inputs)
	return zh_knowledge_close_detail_popup(inputs)
});