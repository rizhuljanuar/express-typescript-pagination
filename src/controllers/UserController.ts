import { Request, Response, NextFunction } from "express";
import user from "../models/UserModels";
import { Op } from "sequelize";

class User {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query as { page: string; limit: string };
      const page = parseInt(query.page) || 0;
      const limit = parseInt(query.limit) || 10;
      const search = req.query.search_query || "";
      const offset = limit * page;
      const totalRows = await user.count({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              email: {
                [Op.like]: "%" + search + "%",
              },
            },
          ],
        },
      });

      // Math.ceil berfungi untuk mengambil value tertinggi dari hasil pembagian: totalRows / limit
      const totalPage = Math.ceil(totalRows / limit);
      const result = await user.findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              email: {
                [Op.like]: "%" + search + "%",
              },
            },
          ],
        },
        offset: offset,
        limit: limit,
        order: [["id", "DESC"]],
      });

      return res.status(200).json({
        result: result,
        page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage,
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default User;
