/**
 * @openapi
 * components:
 *   schemas:
 *     CreateStatus:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *        name:
 *         type: string
 *         description: The name of the user
 *         default: Positif
 *     UpdateStatus:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *        name:
 *         type: string
 *         description: The name of the user
 *         default: Positif
 */
export interface Status {
  id?: string;
  name: string;
}
