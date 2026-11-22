/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Telegram_Widget_Load_ErrorInputs */

const en_telegram_widget_load_error = /** @type {(inputs: Telegram_Widget_Load_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load Telegram sign-in widget. Please check your network and try again.`)
};

const zh_telegram_widget_load_error = /** @type {(inputs: Telegram_Widget_Load_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加载 Telegram 登录组件失败，请检查网络后重试。`)
};

/**
* | output |
* | --- |
* | "Failed to load Telegram sign-in widget. Please check your network and try again." |
*
* @param {Telegram_Widget_Load_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const telegram_widget_load_error = /** @type {((inputs?: Telegram_Widget_Load_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Telegram_Widget_Load_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_telegram_widget_load_error(inputs)
	return zh_telegram_widget_load_error(inputs)
});