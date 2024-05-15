async function getStudentData(data) {
  try {
    const { pageSize = 10, pageIndex = 1, filter = {} } = data;
    let query = `select * from student_details where 1=1`;
    let params = [];
    let count_params = [];
    let count_query = `select count(*) as total from student_details where 1=1`;

    if (filter && filter.email) {
      query += ` and email in (?)`;
      count_query += ` and email in (?)`;
      params.push(filter.email);
      count_params.push(filter.email);
    }

    if (filter.first_name) {
      query += ` and first_name in (?)`;
      params.push(filter.first_name);
      count_query += ` and first_name in (?)`;
      count_params.push(filter.first_name);
    }

    if (filter.gender) {
      query += ` and gender in (?)`;
      params.push(filter.gender);
      count_query += ` and gender in (?)`;
      count_params.push(filter.gender);
    }
    if (filter.date_of_birth) {
      query += ` and date_of_birth between ? and ?`;
      params.push(filter.date_of_birth[0], filter.date_of_birth[1]);
      count_query += ` and date_of_birth between ? and ?`;
      count_params.push(filter.date_of_birth[0], filter.date_of_birth[1]);
    }

    if (pageSize != undefined && pageIndex != undefined) {
      query += ` LIMIT ? OFFSET ?`;
      params.push(Number(pageSize), Number((pageIndex - 1) * pageSize));
    }
    let [result, countResult] = await Promise.all([
      DB.execquery(query, params),
      DB.execquery(count_query, count_params),
    ]);
    console.log(countResult);
    result.count =
      countResult.res && countResult.res.length
        ? countResult.res[0]["total"]
        : 0;
    return result;
  } catch (e) {
    console.log("error in getStudentData", e);
    return { success: false };
  }
}

module.exports = {
  getStudentData,
};
