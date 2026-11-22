/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Default_BadgeInputs */

const en_feishu_bot_default_badge = /** @type {(inputs: Feishu_Bot_Default_BadgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Default`)
};

const zh_feishu_bot_default_badge = /** @type {(inputs: Feishu_Bot_Default_BadgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`默认`)
};

/**
* | output |
* | --- |
* | "Default" |
*
* @param {Feishu_Bot_Default_BadgeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_default_badge = /** @type {((inputs?: Feishu_Bot_Default_BadgeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Default_BadgeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_default_badge(inputs)
	return zh_feishu_bot_default_badge(inputs)
});