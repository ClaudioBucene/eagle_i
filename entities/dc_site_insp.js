var mongoose=require("mongoose");
var dc_schema=new mongoose.Schema({
	access_control:[{
		name:String,
		specific:String,
		biometric_scanner:String,
		biometric_scanner_comment:String,
		doors:String,
		doors_comment:String,
		observacao:String,
		done_by:String,
		done_on:String
	}],

	fire_panel:[{
		name:String,
		specific:String,
		fire_damper_led:String,
		fire_damper_led_comment:String,
		fire_status_manual:String,
		fire_status_manual_comment:String,
		break_glass_pannel:String,
		break_glass_pannel_comment:String,
		vessel_level:String,
		vessel_level_comment:String,
		alarm_on_fire:String,
		alarm_on_fire_comment:String,
		nozzles:String,
		nozzles_comment:String,
		pipes_nozzle:String,
		pipes_nozzle_comment:String,
		observacao:String,
		done_by:String,
		done_on:String,

	}],

	bms:[{
		bms_tablet_alarm:String,
		bms_tablet_alarm_comment:String,
		observacao:String,
		done_by:String,
		done_on:String
	}],
	credelec:[{
		credelec_check:String,
		credelec_check_coment:String,
		observacao:String,
		done_on:String,
		done_by:String
	}],
		generator_A_B:[{
		diesel_leak:String,
		diesel_leak_comment:String,

		oil_leak:String,
		oil_leak_comment:String,

		temperature:String,
		temperature_comment:String,

		control_switch:String,
		control_switch_comment:String,

		battery_charge_rate:String,
		battery_charge_rate_comment:String,

		battery_charge_terminal:String,
		battery_charge_terminal_comment:String,


		week_start_wtout_load:String,
		week_start_wtout_load_comment:String,

		generator_run_hour:String,
		generator_run_hour_comment:String,

		diesel_level:String,
		diesel_level_comment:String,

		oil_level:String,
		oil_level_comment:String,

		water_level:String,
		water_level_comment:String,

		intercooler_hose_clamp:String,
		intercooler_hose_clamp_comment:String,
		observacao:String,
		done_by:String,
		done_on:String

	}],

lights:[{
	visual_check_outdoor:String,
	visual_check_outdoor_comment:String,

	visual_check_indoor:String,
	visual_check_indoor_comment:String,
	observacao:String,
	done_on:String,
	done_by:String

	}],

civil:[{
	civil_data_center:String,
	civil_data_center_comment:String,
	observacao:String,
	done_on:String,
	done_by:String
	}],

hvac:[{
				name:String,
				specific:String,
				alarms:String,
				alarms_comment:String,
				air_filter:String,
				air_filter_comment:String,
				condensate_ext_cleaning:String,
				condensate_ext_cleaning_comment:String,
				motor_defletor:String,
				motor_defletor_comment:String,
				temperature:String,
				temperature_comment:String,
				drainage:String,
				drainage_comment:String,
				abnormal_noise:String,
				abnormal_noise_comment:String,
				observacao:String,
				done_by:String,
				done_on:String,

				}],
	retifier:[{
		name:String,
		specific:String,
		ampere:String,
		ampere_comment:String,
		voltage_comment:String,
		voltage:String,
		observacao:String,
		done_on:String,
		done_by:String

	}],

	ups:[{
		name:String,
		specific:String,
		l1_kw:String,
		l1_A:String,
		l2_kw:String,
		l2_A:String,
		l3_kw:String,
		l3_A:String,
		battery_bank:String,
		battery_bank_comment:String,
		observacao:String,
		done_on:String,
		done_by:String,


	}],

	pdu:[{
		name:String,
		specific:String,
		voltage:String,
		current:String,
		ampere_comment:String,
		voltage_comment:String,
		comment:String,
		done_by:String,
		done_on:String,
		observacao:String
	}],

	power:[{
		name:String,
		specific:String,
		l1_volt:String,
		l1_current:String,
		l1_comment:String,
		l2_volt:String,
		l2_current:String,
		l2_comment:String,
		l3_volt:String,
		l3_current:String,
		l3_comment:String,
		done_by:String,
		done_on:String,
		observacao:String

	}],



	done_by_ref:String,
	site_number:String,
	site_name:String,
	signature:String,
	created_by:String,
	created_on:{type:Date, 'default':Date.now()},
	from:{type:Date, required:true},
	to:{type:Date, required:true}


})

module.exports=mongoose.model("DCenter", dc_schema, "DCenter");

