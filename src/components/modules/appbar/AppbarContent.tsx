'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { Card } from '@/src/components/ui/card'; 
import { INavItem } from '../../shared/AppBar';
import { iconMap } from '@/src/utils/iconMap';



export default function AppBarContent({navItems}: {navItems: INavItem[]}) {
  const pathname = usePathname();

  return (
  
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.5 }}
      className=" fixed inset-x-0 bottom-0 z-50 p-4  "
    >




      <Card 
        // Applying the custom glass-card style defined in globals.css
        className="relative glassy-card h-16 p-2 mx-auto max-w-lg flex items-center justify-center overflow-hidden"
      >

<div  className='h-3 w-1/2 -z-10 bg-white absolute top-0 left-1/2 -translate-x-1/2 rounded-full blur-xl'/>


        <div className='flex justify-between items-center w-full h-full z-10 '>
  {navItems.map((item:INavItem) => {
          const isActive = pathname === item.href;
        const Icon = iconMap[item.icon.toLowerCase()];

          return (
            <Link key={item.href} href={item.href} className="group flex-1">
              <div
                className={`
                  flex flex-col items-center justify-center  relative
                  transition-colors duration-200 
                  ${isActive 
                    ? 'text-[--primary]' // Active uses the vibrant Cyan
                    : 'text-white/50 hover:text-white/80' // Inactive is muted
                  }
                `}
              >
               
                {isActive && (
                  <motion.span
                    layoutId="active-dot"
                    className="absolute -top-1.5 w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-foreground/30 " 
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                
               
                <Icon 
                  className={`
                    w-6 h-6 transition-all duration-300
                    ${isActive ? 'scale-110' : 'group-hover:scale-105'}
                  `} 
                />
                
               
              </div>
            </Link>
          );
        })}
        </div>
      
      </Card>
    </motion.div>
  );
}