import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const defaultUsers = [
    {
      id: 9999,
      name: "Admin",
      email: "admin123@gmail.com",
      password: "123456",
      role: "Admin",
      status: "Active",
    },
  ];

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      try {
        const parsed = JSON.parse(storedUsers);
        const adminExists = parsed.some(
          (user) => user.email === "admin123@gmail.com"
        );

        let updatedUsers = parsed;

        if (!adminExists) {
          updatedUsers = [...parsed, ...defaultUsers];
        }

        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setIsLoading(false);
        return;
      } catch (error) {
        localStorage.removeItem("users");
      }
    }

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Fetch failed");
        }
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("Unexpected API response");
        }

        const updatedUsers = data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: "Viewer",
          status: "Active",
        }));

        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      })
      .catch(() => {
        setUsers(defaultUsers);
        localStorage.setItem("users", JSON.stringify(defaultUsers));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  const addUser = (newUser) => {
    const userWithId = {
      ...newUser,
      id: Date.now(),
    };

    setUsers((prev) => [...prev, userWithId]);
  };

  return (
    <UserContext.Provider value={{ users, setUsers, addUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
