/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Snapshot_ExportInputs */

const en_billing_snapshot_export = /** @type {(inputs: Billing_Snapshot_ExportInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Export CSV snapshot`)
};

const zh_billing_snapshot_export = /** @type {(inputs: Billing_Snapshot_ExportInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`导出 CSV 快照`)
};

/**
* | output |
* | --- |
* | "Export CSV snapshot" |
*
* @param {Billing_Snapshot_ExportInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_snapshot_export = /** @type {((inputs?: Billing_Snapshot_ExportInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Snapshot_ExportInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_snapshot_export(inputs)
	return zh_billing_snapshot_export(inputs)
});