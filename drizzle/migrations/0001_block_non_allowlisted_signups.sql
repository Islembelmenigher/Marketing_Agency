CREATE OR REPLACE FUNCTION public.block_non_allowlisted_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only emails on the server-only admin allowlist may ever get an account.
  IF NEW.email IS NULL OR NOT EXISTS (
    SELECT 1 FROM public.admin_emails WHERE email = lower(NEW.email)
  ) THEN
    RAISE EXCEPTION 'Registration is closed' USING ERRCODE = 'P0001';
  END IF;
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.block_non_allowlisted_signup() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS on_auth_user_signup_allowlist ON auth.users;
CREATE TRIGGER on_auth_user_signup_allowlist
  BEFORE INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.block_non_allowlisted_signup();