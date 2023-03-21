import Head from "next/head"
import { Settings20Regular } from "@fluentui/react-icons"
import { DialogClose } from "@radix-ui/react-dialog"
import { Label } from "@radix-ui/react-dropdown-menu"
import useTranslation from "next-translate/useTranslation"

import { Layout } from "@/components/layout"
import { PageContent } from "@/components/page"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export default function SettingsPage() {
  const { t } = useTranslation("common") // default namespace (optional)
  let ver = "3.0.0.2303-final1"
  return (
    <Layout>
      <Head>
        <title>Passliss</title>
        <meta
          name="description"
          content="Passliss is a simple yet modern password generator."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContent page="settings">
        <div className="mb-2 flex items-center space-x-2">
          <Settings20Regular primaryFill="#0088FF" className="text-white" />

          <p className="ml-2 font-bold">{t("settings")}</p>
        </div>
        <div className="m-2 flex flex-col items-center justify-center rounded-lg bg-white p-2 dark:bg-slate-800">
          <div className="m-3 flex items-center space-x-2">
            <h2 className="text-4xl font-bold">{t("title")}</h2>
            <span className="m-2 rounded-full bg-gradient-to-br from-[#0088FF] to-[#2153E0] px-2 font-bold">
              {t("web")}
            </span>
          </div>
          <p className="font-bold">{`${t("version")} ${ver}`}</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="nav" variant="outline" className="mt-5 font-bold">
                {t("see-licenses")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t("licenses")}</DialogTitle>
              </DialogHeader>
              <p>
                NextJS - MIT License - © 2023 Vercel, Inc.
                <br></br>
                RadixUI - MIT License - © 2022 WorkOS
                <br></br>
                shadcn/ui - MIT License - © 2023 shadcn
                <br></br>
                Fluent System Icons - MIT License - © 2020 Microsoft Corporation
                <br></br>
                Passliss - MIT License - © 2023 Léo Corporation
              </p>
              <DialogFooter>
                <DialogClose>
                  <Button size="nav" type="submit">
                    {t("ok")}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </PageContent>
    </Layout>
  )
}
