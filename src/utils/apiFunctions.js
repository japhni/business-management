import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});
const token = localStorage.getItem("token");

export const getHeader = () => {
  return {
    Authorization: `Bearer ${token}`,
    "Content-type": "application/json",
  };
};

export const getHeaderForMultifile = () => {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  };
};

/* This function register a new customer */
export async function registerCustomer(registration) {
  try {
    const response = await api.post("/customers/create-customer", registration);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(
        `Problem d'enregistement du client -> error : ${error.message}`
      );
    }
  }
}

/* This function register a new customer */
export async function registerEmployee(registration) {
  try {
    const response = await api.post("/employees/create-employee", registration);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(
        `Problem d'enregistement du client -> error : ${error.message}`
      );
    }
  }
}

/* This function login a registered user */
export async function loginUser(login) {
  try {
    const response = await api.post("/auth/login", login);

    if (response.status >= 200 && response.status <= 300) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

/** This function fetches all customers from the database */
export async function getAllCustomers() {
  try {
    const result = await api.get("/customers/all-customers", {
      headers: getHeader(),
    });

    return result.data;
  } catch (error) {
    throw new Error(
      `Erreur de recuperer la liste des clients: ${error.message}`
    );
  }
}

/** This function fetches all employees from the database */
export async function getAllEmployees() {
  try {
    const result = await api.get("/employees/all-employees", {
      headers: getHeader(),
    });

    return result.data;
  } catch (error) {
    throw new Error(
      `Erreur de recuperer la liste des employees: ${error.message}`
    );
  }
}

/*** This function fetches the customer by ID from the database */
export async function getCustomerById(userId, token) {
  try {
    const response = await api.get(`/customers/read-customer-by-id/${userId}`, {
      headers: getHeader(),
    });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

/*** This function fetches the employee by ID from the database */
export async function getEmployeeById(userId, token) {
  try {
    const response = await api.get(`/employees/read-employee-by-id/${userId}`, {
      headers: getHeader(),
    });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

/*** This function fetches the User by ID from the database */
export async function getUserById(userId, token) {
  try {
    const response = await api.get(`/users/read-user-by-id/${userId}`, {
      headers: getHeader(),
    });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

/** This function update a user by the ID */
/*export async function updateUserById(userId, userData) {
  const formData = new FormData();
  formData.append("firstName", userData.firstName);
  formData.append("lastName", userData.lastName);
  formData.append("otherNames", userData.otherNames);
  formData.append("phoneNumber", userData.phoneNumber);
  formData.append("email", userData.email);
  formData.append("birthday", userData.birthday);
  formData.append("firstAddress", userData.firstAddress);
  formData.append("secondAdress", userData.secondAdress);
  formData.append("details", userData.details);

  try {
    const response = await api.put(`/users/user/update/${userId}`, formData, {
      headers: getHeader(),
    })

    return response;

  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(
        `Problem de mise a jour des donnees -> error : ${error.message}`
      );
    }
  }

}*/


/* This function update an user by id */
export async function updateUserById(userId, userData) {
    try {
      const response = await api.put(`/users/user/update/${userId}`, userData, {
        headers: getHeader(),
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data);
      } else {
        throw new Error(
          `Problem de mise a jour des infos -> error : ${error.message}`
        );
      }
    }
  }


  /* This function update a password by id*/
export async function updateUserPasswordById(userId, userData) {
  try {
    const response = await api.put(`/users/user/password/update/${userId}`, userData, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(
        `Problem de mise a jour de mot de passe -> error : ${error.message}`
      );
    }
  }
}

/* This function gets all histories info by id and range date */
export async function getHistoryInfosByIdAndDatesMedthod(userId,startDate, endDate) {
	const result = await api.get(
    `user-history-by-date?startDate=${startDate}&endDate=${endDate}&userId=${userId}`, {
      headers: getHeader(),
    })
	return result
}


/* This function create new customer fidelity */
export async function createCustomerEmployee(userId, userData) {
  try {
    const response = await api.post(`/create-employeeCustomer/${userId}`, userData, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(
        `Problem de mise a jour des donnees -> error : ${error.message}`
      );
    }
  }
}

/** This function fetches all employees from the database */
export async function getAllHistoryCustomerEmployee() {
  try {
    const result = await api.get("/all-employeeCustomers", {
      headers: getHeader(),
    });

    return result.data;
  } catch (error) {
    throw new Error(
      `Erreur de recuperer l'hstorique: ${error.message}`
    );
  }
}


/* This function create new item */
export async function createNewItem(item) {
  try {
    const response = await api.post("/create-itemToPurchase", item, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(
        `Problem d'enregistement d'un article -> error : ${error.message}`
      );
    }
  }
}


/* This function create new spending */
export async function createNewSpending(spending) {
  try {
    const response = await api.post("/create-spending", spending, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(
        `Problem d'enregistement d'un article -> error : ${error.message}`
      );
    }
  }
}


/** This function fetches all items to purchase from the database */
export async function getAllItems() {
  try {
    const result = await api.get("/all-itemPurchased", {
      headers: getHeader(),
    });

    return result.data;
  } catch (error) {
    throw new Error(
      `Erreur de recuperer les article: ${error.message}`
    );
  }
}


/* This function create new debt */
export async function createNewDebt(debt) {
  try {
    const response = await api.post("/create-debt", debt, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(
        `Problem d'enregistement d'une dette -> error : ${error.message}`
      );
    }
  }
}

/* This function create the refunding of debt */
export async function createDebtPaid(paidDebt) {
  try {
    const response = await api.post("/create-debt-paid", paidDebt, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(
        `Problem d'enregistement d'une dette -> error : ${error.message}`
      );
    }
  }
}


/* This function gets all debts histories info by id and range date */
export async function getDebtByUserIdAndDatesMedthod(userId,startDate, endDate) {
	const result = await api.get(
    `user-debt-history-by-dates?startDate=${startDate}&endDate=${endDate}&userId=${userId}`, {
      headers: getHeader(),
    })
	return result
}


/* This function gets all debts refund histories info by id and range date */
export async function getRefundDebtByUserIdAndDatesMedthod(userId,startDate, endDate) {
	const result = await api.get(
    `user-debt-history-by-dates?startDate=${startDate}&endDate=${endDate}&userId=${userId}`, {
      headers: getHeader(),
    })
	return result
}


/*** This function fetches from the database all debts by requester id */
export async function getDebtByRequesterId(requesterId, token) {
  try {
    const response = await api.get(`/all-debts-history-by-requester-id?requesterId=${requesterId}`, {
      headers: getHeader(),
    });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}


/*** This function fetches from the database all debts paid by refunder id */
export async function getDebtPaidByRefunderId(refunderId, token) {
  try {
    const response = await api.get(`all-debts-paid-history-by-refunder-id?refunderId=${refunderId}`, {
      headers: getHeader(),
    });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}


/* This function create new coif style */
export async function createNewCoif(coif) {
  try {
    const response = await api.post("/create-coif-style-type", coif, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(
        `Problem d'enregistement d'un coif -> error : ${error.message}`
      );
    }
  }
}


/** This function fetches all coif tyles from the database */
export async function getAllCoifStyles() {
  try {
    const result = await api.get("/all-coif-styles", {
      headers: getHeader(),
    });

    return result.data;
  } catch (error) {
    throw new Error(
      `Erreur de recuperer les styles de coif: ${error.message}`
    );
  }
}


/*** This function fetches the employee by ID from the database */
export async function getCoifStyleById(coifStyleId, token) {
  try {
    const response = await api.get(`/read-coif-style-by-id/${coifStyleId}`, {
      headers: getHeader(),
    });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}


/** This function fetches all roles from the database */
export async function getAllRoles() {
  try {
    const result = await api.get("/roles/all-roles", {
      headers: getHeader(),
    });

    return result.data;
  } catch (error) {
    throw new Error(
      `Erreur de recuperer la liste des roles: ${error.message}`
    );
  }
}


