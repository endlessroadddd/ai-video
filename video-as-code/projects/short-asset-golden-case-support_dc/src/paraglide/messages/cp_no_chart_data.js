/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Cp_No_Chart_DataInputs */

const en_cp_no_chart_data = /** @type {(inputs: Cp_No_Chart_DataInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No data available for the selected time range`)
};

const zh_cp_no_chart_data = /** @type {(inputs: Cp_No_Chart_DataInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前时间范围内暂无可视化数据`)
};

/**
* | output |
* | --- |
* | "No data available for the selected time range" |
*
* @param {Cp_No_Chart_DataInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_no_chart_data = /** @type {((inputs?: Cp_No_Chart_DataInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_No_Chart_DataInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_cp_no_chart_data(inputs)
	return zh_cp_no_chart_data(inputs)
});