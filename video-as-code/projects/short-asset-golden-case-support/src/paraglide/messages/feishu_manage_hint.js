/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Manage_HintInputs */

const en_feishu_manage_hint = /** @type {(inputs: Feishu_Manage_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Complete the Feishu integration first. Once groups are synced in, options will appear here and in Workgroup Settings.`)
};

const zh_feishu_manage_hint = /** @type {(inputs: Feishu_Manage_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`先完成飞书工作群接入，群聊同步进来后，这里和“工作群设置”都会自动出现可选项。`)
};

/**
* | output |
* | --- |
* | "Complete the Feishu integration first. Once groups are synced in, options will appear here and in Workgroup Settings." |
*
* @param {Feishu_Manage_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_manage_hint = /** @type {((inputs?: Feishu_Manage_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Manage_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_manage_hint(inputs)
	return zh_feishu_manage_hint(inputs)
});