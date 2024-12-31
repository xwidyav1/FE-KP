// import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/admin/dashboard/DashboardCard";
import { Newspaper, Images, File, Files, ChevronRight} from 'lucide-react';
import PostsTable from "@/components/admin/posts/PostsTable";
import AnalyticsChart from "@/components/admin/dashboard/AnalyticsChart";

export default function Home(){
  return (
    <div className="flex flex-col gap-y-[3vw]">
      <div className="flex flex-col md:flex-row justify-center gap-[5vw] pt-[1vw]">
        <DashboardCard 
          title="Berita"
          count={10}
          icon={<Newspaper className="text-slate-500" size={72} />}
        />
        <DashboardCard 
          title="Artikel"
          count={10}
          icon={<Files className="text-slate-500" size={72} />}
        />
        <DashboardCard 
          title="Galeri"
          count={10}
          icon={<Images className="text-slate-500" size={72} />}
        />
        <DashboardCard 
          title="Dokumen"
          count={10}
          icon={<File className="text-slate-500" size={72} />}
        />
      </div>
      <AnalyticsChart />
      <PostsTable limit={5} className="mt-[3vw]" />
    </div>
  );
}