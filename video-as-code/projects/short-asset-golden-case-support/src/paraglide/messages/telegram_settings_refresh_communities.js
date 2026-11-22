/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Refresh_CommunitiesInputs */

const en_telegram_settings_refresh_communities = /** @type {(inputs: Telegram_Settings_Refresh_CommunitiesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Refresh community list`)
};

const zh_telegram_settings_refresh_communities = /** @type {(inputs: Telegram_Settings_Refresh_CommunitiesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`刷新社区列表`)
};

/**
* | output |
* | --- |
* | "Refresh community list" |
*
* @param {Telegram_Settings_Refresh_CommunitiesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_refresh_communities = /** @type {((inputs?: Telegram_Settings_Refresh_CommunitiesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Refresh_CommunitiesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_refresh_communities(inputs)
	return zh_telegram_settings_refresh_communities(inputs)
});