import "dotenv/config";
import env from "@/config/env";
import app from "@/config/server";
import routesInit from "./routes";
import { initializeEmailWorker } from "./workers/email.worker";

routesInit(app);
initializeEmailWorker();

app.listen(env.PORT, () => {
  console.log(`✅ Server running at http://localhost:${env.PORT}`);
  console.log(`✅ Database URL: ${env.DATABASE_URL}`);
});
