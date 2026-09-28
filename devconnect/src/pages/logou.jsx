import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderCircle, LogOut, MonitorSmartphone } from "lucide-react";

import { AuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Logou = () => {
  const { logout, logoutAll } = useContext(AuthContext);
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    setError("");
    setSubmitting(true);

    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (requestError) {
      setError(
        requestError.message || "Unable to log out. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogoutAll = async () => {
    setError("");
    setSubmitting(true);

    try {
      await logoutAll();
      navigate("/login", { replace: true });
    } catch (requestError) {
      setError(
        requestError.message ||
        "Unable to log out from all devices. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-muted/40 px-4 py-10">
      <Card className="w-full max-w-md shadow-sm">

        <CardHeader>
          <div className="mb-2 flex size-11 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <LogOut className="size-5" />
          </div>

          <CardTitle className="text-2xl">
            Log out of DevConnect?
          </CardTitle>

          <CardDescription>
            Choose whether you want to log out from this device or all
            devices where your account is currently signed in.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">

          {error && (
            <p
              className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
              role="alert"
            >
              {error}
            </p>
          )}

          <div className="space-y-3">

            <Button
              type="button"
              className="w-full justify-start"
              onClick={handleLogout}
              disabled={submitting}
            >
              {submitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <LogOut />
              )}

              <span>
                {submitting ? "Logging out..." : "Log out from this device"}
              </span>
            </Button>

            <Button
              type="button"
              variant="destructive"
              className="w-full justify-start"
              onClick={handleLogoutAll}
              disabled={submitting}
            >
              {submitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <MonitorSmartphone />
              )}

              <span>
                {submitting
                  ? "Logging out..."
                  : "Log out from all devices"}
              </span>
            </Button>

          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              disabled={submitting}
            >
              Cancel
            </Button>
          </div>

        </CardContent>
      </Card>
    </main>
  );
};

export default Logou;