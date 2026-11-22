/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Add_CommunityInputs */

const en_telegram_settings_add_community = /** @type {(inputs: Telegram_Settings_Add_CommunityInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add Community`)
};

const zh_telegram_settings_add_community = /** @type {(inputs: Telegram_Settings_Add_CommunityInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`添加社区`)
};

/**
* | output |
* | --- |
* | "Add Community" |
*
* @param {Telegram_Settings_Add_CommunityInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_add_community = /** @type {((inputs?: Telegram_Settings_Add_CommunityInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Add_CommunityInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_add_community(inputs)
	return zh_telegram_settings_add_community(inputs)
});