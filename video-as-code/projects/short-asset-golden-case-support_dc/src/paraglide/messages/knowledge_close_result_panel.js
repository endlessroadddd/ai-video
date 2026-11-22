/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Close_Result_PanelInputs */

const en_knowledge_close_result_panel = /** @type {(inputs: Knowledge_Close_Result_PanelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close result panel`)
};

const zh_knowledge_close_result_panel = /** @type {(inputs: Knowledge_Close_Result_PanelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭结果面板`)
};

/**
* | output |
* | --- |
* | "Close result panel" |
*
* @param {Knowledge_Close_Result_PanelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_close_result_panel = /** @type {((inputs?: Knowledge_Close_Result_PanelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Close_Result_PanelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_close_result_panel(inputs)
	return zh_knowledge_close_result_panel(inputs)
});