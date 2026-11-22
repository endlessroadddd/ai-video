/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Meta_NeverInputs */

const en_feishu_bot_meta_never = /** @type {(inputs: Feishu_Bot_Meta_NeverInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Never`)
};

const zh_feishu_bot_meta_never = /** @type {(inputs: Feishu_Bot_Meta_NeverInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`从未`)
};

/**
* | output |
* | --- |
* | "Never" |
*
* @param {Feishu_Bot_Meta_NeverInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_meta_never = /** @type {((inputs?: Feishu_Bot_Meta_NeverInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Meta_NeverInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_meta_never(inputs)
	return zh_feishu_bot_meta_never(inputs)
});