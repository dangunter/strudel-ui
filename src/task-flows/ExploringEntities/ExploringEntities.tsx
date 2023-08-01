import React, { ReactNode, useEffect, useState } from 'react';
import { AnalyticsProvider } from '../../components/Analytics/AnalyticsProvider';
import { ExploringEntitiesContent } from './ExploringEntitiesContent';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import * as d3 from 'd3-fetch';

const columns: GridColDef[] = [
  { 
    field: 'Organism', 
    headerName: 'Organism', 
    width: 200 
  },
  {
    field: 'Common Name',
    headerName: 'Common Name',
    width: 150,
  },
  {
    field: 'Assembly',
    headerName: 'Assembly',
    width: 150,
  },
  {
    field: 'Data Usage Policy',
    headerName: 'Data Usage Policy',
    width: 150,
  },
  {
    field: 'Euk. BUSCO %',
    headerName: 'Euk. BUSCO %',
    type: 'number',
    width: 110,
  },
  {
    field: 'Emb. BUSCO %',
    headerName: 'Emb. BUSCO %',
    type: 'number',
    width: 110,
  },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];

export const ExploringEntities: React.FC = () => {
  const [entities, setEntities] = useState<any[]>([]);

  useEffect(() => {
    console.log('render');
    if (entities.length === 0) {
      console.log(entities);
      const getData = async () => {
        const data = await d3.tsv('data/Current_Genomes.tsv');
        console.log(data);
        setEntities(data);
      }
      getData();
    }
  }, []);

  return (
    <AnalyticsProvider data={entities} columns={columns} dataIdField='Proteome_ID'>
      <ExploringEntitiesContent />
    </AnalyticsProvider>
  )
}