/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Step_Sync_CommunitiesInputs */

const en_telegram_settings_step_sync_communities = /** @type {(inputs: Telegram_Settings_Step_Sync_CommunitiesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`3. Sync community list`)
};

const zh_telegram_settings_step_sync_communities = /** @type {(inputs: Telegram_Settings_Step_Sync_CommunitiesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`3. 同步社区列表`)
};

/**
* | output |
* | --- |
* | "3. Sync community list" |
*
* @param {Telegram_Settings_Step_Sync_CommunitiesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_step_sync_communities = /** @type {((inputs?: Telegram_Settings_Step_Sync_CommunitiesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Step_Sync_CommunitiesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_step_sync_communities(inputs)
	return zh_telegram_settings_step_sync_communities(inputs)
});