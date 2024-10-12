'use client'

import Link from "@/components/link";
import {Button} from "@/components/ui/button";
import { useMatchPath } from "@/hooks/useMatchPath";
import { cn } from "@/lib/utils";

export default function Layout(
  { children }: { children?: React.ReactNode },
) {



  return (
    <div className="flex h-full grow flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64 p-2 divide-y-2">
        <SideNav/>
      </div>
      <div className="flex-grow md:overflow-y-auto">{children}</div>
    </div>

  )
}


function RouteItem(
  {name, path}: {name: string, path: string},
) {
  const isActive = useMatchPath(path);
  const activeClass = isActive ? 'bg-zinc-100/90 text-zinc-900' : '';
  return (
    <Link href={path}>
      <Button variant={'ghost'} className={cn('w-full text-xl font-bold', activeClass)}>
        {name}
      </Button>
    </Link>
  )
}

function SideNav() {
  return (
    <div>
      <ul>
        <li><RouteItem name={"凭证管理"} path={"/credentials"}/></li>
        <li><RouteItem name={"Schema管理"} path={"/schemas"}/></li>
        <li><RouteItem name={"Token管理"} path={"/token"}/></li>
      </ul>
    </div>
  )
}