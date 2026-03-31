CREATE INDEX "bikes_brand_id_idx" ON "bikes" USING btree ("brand_id");--> statement-breakpoint
CREATE INDEX "bikes_name_idx" ON "bikes" USING btree ("name");--> statement-breakpoint
CREATE INDEX "showrooms_brand_id_idx" ON "showrooms" USING btree ("brand_id");--> statement-breakpoint
CREATE INDEX "showrooms_name_idx" ON "showrooms" USING btree ("name");--> statement-breakpoint
CREATE INDEX "users_role_id_idx" ON "users" USING btree ("role_id");--> statement-breakpoint
CREATE INDEX "users_brand_id_idx" ON "users" USING btree ("brand_id");--> statement-breakpoint
CREATE INDEX "users_showroom_id_idx" ON "users" USING btree ("showroom_id");--> statement-breakpoint
CREATE INDEX "users_is_active_idx" ON "users" USING btree ("is_active");