/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Settings_Poll_Status_ErrorInputs */

const en_telegram_settings_poll_status_error = /** @type {(inputs: Telegram_Settings_Poll_Status_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to query automatic binding status.`)
};

const zh_telegram_settings_poll_status_error = /** @type {(inputs: Telegram_Settings_Poll_Status_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`查询自动绑定状态失败。`)
};

/**
* | output |
* | --- |
* | "Failed to query automatic binding status." |
*
* @param {Telegram_Settings_Poll_Status_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_settings_poll_status_error = /** @type {((inputs?: Telegram_Settings_Poll_Status_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Settings_Poll_Status_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_settings_poll_status_error(inputs)
	return zh_telegram_settings_poll_status_error(inputs)
});