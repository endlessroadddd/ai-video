/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Empty_Manage_HintInputs */

const en_feishu_bot_empty_manage_hint = /** @type {(inputs: Feishu_Bot_Empty_Manage_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add a bot first, then verify, restart and assign channels from this panel.`)
};

const zh_feishu_bot_empty_manage_hint = /** @type {(inputs: Feishu_Bot_Empty_Manage_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`先新增 Bot，后续验证、重启和频道归属都在这个面板完成。`)
};

/**
* | output |
* | --- |
* | "Add a bot first, then verify, restart and assign channels from this panel." |
*
* @param {Feishu_Bot_Empty_Manage_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_empty_manage_hint = /** @type {((inputs?: Feishu_Bot_Empty_Manage_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Empty_Manage_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_empty_manage_hint(inputs)
	return zh_feishu_bot_empty_manage_hint(inputs)
});