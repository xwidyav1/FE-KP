import React from 'react';

import { Card, CardContent } from "@/components/ui/card";
import PropTypes from 'prop-types';

/**
 * Komponen DashboardCard
 * @param {Object} props - Properti komponen
 * @param {string} props.title - Judul kartu
 * @param {number} props.count - Jumlah data yang ditampilkan
 * @param {React.ReactElement} props.icon - Ikon untuk ditampilkan
 * @returns JSX Elemen
 */
const DashboardCard = ({ title, count, icon }) => {
  return (
    <Card className="bg-slate-100 dark:bg-slate-800 p-[1vw]">
      <CardContent>
        <h3 className="text-[1.5vw] text-center mb-4 font-bold text-slate-500 dark:text-slate-200">
          {title}
        </h3>
        <div className="flex gap-[1vw] justify-center items-center">
          {icon}
          <h3 className="text-[2vw] font-semibold text-slate-500 dark:text-slate-200">
            {count}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

// Validasi properti dengan PropTypes
DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  icon: PropTypes.element.isRequired,
};

export default DashboardCard;
