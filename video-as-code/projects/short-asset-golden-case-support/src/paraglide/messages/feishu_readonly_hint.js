/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Readonly_HintInputs */

const en_feishu_readonly_hint = /** @type {(inputs: Feishu_Readonly_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This account is read only. You can view synced Feishu groups here.`)
};

const zh_feishu_readonly_hint = /** @type {(inputs: Feishu_Readonly_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账号为只读，可在这里查看已同步的飞书群聊。`)
};

/**
* | output |
* | --- |
* | "This account is read only. You can view synced Feishu groups here." |
*
* @param {Feishu_Readonly_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_readonly_hint = /** @type {((inputs?: Feishu_Readonly_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Readonly_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_readonly_hint(inputs)
	return zh_feishu_readonly_hint(inputs)
});