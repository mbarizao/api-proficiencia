import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import apiReturns from "./apiReturns.js";

dotenv.config();

const checkEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

const validateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        if (err) {
            res.send(apiReturns.error(err));
            return res.status(401).end();
        };

        req.userId = decoded.id;
        next();
    });

}

const newQueryString = (queryStringDefault, params) => {
            let query = '';

            if (Object.keys(params).length > 0) {
                Object.keys(params).forEach((key, index) => {
                    const value = params[key];

                    if (index === 0) {
                        return query = `${queryStringDefault} WHERE ${key} = "${value}"`;
                    }

                    query = `${query} AND ${key} = "${value}"`;
                });

                query = `${query};`;

                return query;
            }

            return queryStringDefault
}

const updateQueryString = (table, data, editId) => {
    const defaultQuery = `UPDATE ${table} SET`
    let query = defaultQuery;

    if (Object.keys(data).length > 0) {
        Object.keys(data).forEach((key, index) => {
            const value = data[key];

            query = `${query} ${key}='${value}'`;

            if (index === (Object.keys(data).length - 1)) {
                return query = `${query} WHERE id = ${editId}`;
            }

            query = `${query}, ` 
        });

        query = `${query};`;

        return query;
    }

    return queryStringDefault
}

const paginationQueryString = async (table, params) => {
    const filters = JSON.parse(params.stringFilters);
    const sorting = JSON.parse(params.columnSorting);
    const page = params.page ?? 0;
    const itemsPerPage = params.itemsPerPage ?? 10;

    let result = `SELECT * FROM ${table}`;

    if (filters.length > 0) {
        result = `${result} WHERE`
        filters?.forEach((item) => {
            result = `${result} ${item.id} LIKE '%${item.value}%'`
        })
    }

    if (sorting.length > 0) {
        result = `${result} ORDER BY ${sorting[0].id} ${sorting[0].desc ? 'DESC' : 'ASC'} `
    }

    result = `${result} LIMIT ${page},${itemsPerPage}`

    return result;
}

export {
    checkEmail,
    validateToken,
    newQueryString,
    updateQueryString,
    paginationQueryString
}