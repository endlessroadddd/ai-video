/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Bot_Disable_Confirm_DescriptionInputs */

const en_feishu_bot_disable_confirm_description = /** @type {(inputs: Feishu_Bot_Disable_Confirm_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Disabled bots will stop handling channels until you enable them again.`)
};

const zh_feishu_bot_disable_confirm_description = /** @type {(inputs: Feishu_Bot_Disable_Confirm_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`停用后，这个 Bot 不再处理任何频道，直到再次启用。`)
};

/**
* | output |
* | --- |
* | "Disabled bots will stop handling channels until you enable them again." |
*
* @param {Feishu_Bot_Disable_Confirm_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_bot_disable_confirm_description = /** @type {((inputs?: Feishu_Bot_Disable_Confirm_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Bot_Disable_Confirm_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_bot_disable_confirm_description(inputs)
	return zh_feishu_bot_disable_confirm_description(inputs)
});