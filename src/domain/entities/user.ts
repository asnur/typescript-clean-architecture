/**
 * @openapi
 * components:
 *   schemas:
 *     Register:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *        name:
 *         type: string
 *         description: The name of the user
 *         default: Asnur Ramdani
 *        email:
 *         type: string
 *         description: The email of the user
 *         default: asnur@mail.com
 *        password:
 *         type: string
 *         description: The password of the user
 *         default: 123456
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *        email:
 *         type: string
 *         description: The email of the user
 *         default: asnur@mail.com
 *        password:
 *         type: string
 *         description: The password of the user
 *         default: 123456
 *     CreateUser:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *        name:
 *         type: string
 *         description: The name of the user
 *         default: Asnur Ramdani
 *        email:
 *         type: string
 *         description: The email of the user
 *         default: asnur@mail.com
 *        password:
 *         type: string
 *         description: The password of the user
 *         default: 123456
 *     UpdateUser:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *         description: The name of the user
 *         default: Asnur Ramdani
 *        email:
 *         type: string
 *         description: The email of the user
 *         default: asnur@mail.com
 *        password:
 *         type: string
 *         description: The password of the user
 *         default: 123456
 */
export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
}
