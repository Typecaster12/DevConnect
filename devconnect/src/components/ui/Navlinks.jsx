import { NavLink } from "react-router-dom";

const navItems = [
  {
    label: "Feed",
    path: "/",
  },
  {
    label: "Developers",
    path: "/developers",
  },
  {
    label: "Notifications",
    path: "/notifications",
  },
];

const NavLinks = () => {
  return (
    <nav>
      <ul className="flex items-center gap-6">

        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "font-medium text-primary"
                  : "font-medium text-muted-foreground transition hover:text-foreground"
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}

      </ul>
    </nav>
  );
};

export default NavLinks;