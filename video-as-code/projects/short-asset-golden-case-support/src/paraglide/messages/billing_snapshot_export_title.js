/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Snapshot_Export_TitleInputs */

const en_billing_snapshot_export_title = /** @type {(inputs: Billing_Snapshot_Export_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Export current period CSV snapshot`)
};

const zh_billing_snapshot_export_title = /** @type {(inputs: Billing_Snapshot_Export_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`导出当前账期 CSV 快照`)
};

/**
* | output |
* | --- |
* | "Export current period CSV snapshot" |
*
* @param {Billing_Snapshot_Export_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_snapshot_export_title = /** @type {((inputs?: Billing_Snapshot_Export_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Snapshot_Export_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_snapshot_export_title(inputs)
	return zh_billing_snapshot_export_title(inputs)
});