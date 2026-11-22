/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Meta_Verified_AtInputs */

const en_feishu_bot_meta_verified_at = /** @type {(inputs: Feishu_Bot_Meta_Verified_AtInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Last verified`)
};

const zh_feishu_bot_meta_verified_at = /** @type {(inputs: Feishu_Bot_Meta_Verified_AtInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最近验证`)
};

/**
* | output |
* | --- |
* | "Last verified" |
*
* @param {Feishu_Bot_Meta_Verified_AtInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_meta_verified_at = /** @type {((inputs?: Feishu_Bot_Meta_Verified_AtInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Meta_Verified_AtInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_meta_verified_at(inputs)
	return zh_feishu_bot_meta_verified_at(inputs)
});