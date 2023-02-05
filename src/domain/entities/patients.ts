/**
 * @openapi
 * components:
 *   schemas:
 *     CreatePatients:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *         - address
 *         - id_status
 *         - in_date_at
 *       properties:
 *        name:
 *         type: string
 *         description: The name of the patients
 *         default: Asnur Ramdani
 *        phone:
 *         type: string
 *         description: The phone of the patients
 *         default: 081999999
 *        address:
 *         type: string
 *         description: The address of the patients
 *         default: jalan jalan
 *        id_status:
 *         type: string
 *         description: The id_status of the patients
 *         default: ajksdn8979-ajksdn8979-ajksdn8979-ajksdn8979
 *        in_date_at:
 *         type: string
 *         description: The in_date_at of the patients
 *         default: 2021-01-01
 *        out_date_at:
 *         type: string
 *         description: The in_date_at of the patients
 *         default: 2021-01-01
 *     UpdatePatients:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *         description: The name of the patients
 *         default: Asnur Ramdani
 *        phone:
 *         type: string
 *         description: The phone of the patients
 *         default: 081999999
 *        address:
 *         type: string
 *         description: The address of the patients
 *         default: jalan jalan
 *        id_status:
 *         type: string
 *         description: The id_status of the patients
 *         default: ajksdn8979-ajksdn8979-ajksdn8979-ajksdn8979
 *        in_date_at:
 *         type: string
 *         description: The in_date_at of the patients
 *         default: 2021-01-01
 *        out_date_at:
 *         type: string
 *         description: The in_date_at of the patients
 *         default: 2021-01-01
 *
 */
export interface Patients {
  id?: string;
  name?: string;
  phone?: string;
  address?: string;
  id_status?: string;
  in_date_at?: Date;
  out_date_at?: Date;
}
