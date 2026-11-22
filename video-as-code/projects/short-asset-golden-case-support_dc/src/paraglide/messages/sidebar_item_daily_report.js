/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sidebar_Item_Daily_ReportInputs */

const en_sidebar_item_daily_report = /** @type {(inputs: Sidebar_Item_Daily_ReportInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Daily Report`)
};

const zh_sidebar_item_daily_report = /** @type {(inputs: Sidebar_Item_Daily_ReportInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`日报`)
};

/**
* | output |
* | --- |
* | "Daily Report" |
*
* @param {Sidebar_Item_Daily_ReportInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_item_daily_report = /** @type {((inputs?: Sidebar_Item_Daily_ReportInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Item_Daily_ReportInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sidebar_item_daily_report(inputs)
	return zh_sidebar_item_daily_report(inputs)
});