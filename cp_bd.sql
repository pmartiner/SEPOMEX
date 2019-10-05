BEGIN;
CREATE TABLE cp (
    d_codigo            TEXT,
    d_asenta            TEXT,
    d_tipo_asenta       TEXT,
    D_mnpio             TEXT,
    d_estado            TEXT,
    d_ciudad            TEXT,
    d_CP                TEXT,
    c_estado            TEXT,
    c_oficina           TEXT,
    c_CP                TEXT,
    c_tipo_asenta       TEXT,
    c_mnpio             TEXT,
    id_asenta_cpcons    TEXT,    
    d_zona              TEXT,        
    c_cve_ciudad        TEXT      
);
COMMIT;

COPY cp(d_codigo,d_asenta,d_tipo_asenta,D_mnpio,d_estado,d_ciudad,d_CP,c_estado,c_oficina,c_CP,c_tipo_asenta,c_mnpio,id_asenta_cpcons,d_zona,c_cve_ciudad) 
FROM './CPdescarga.csv' DELIMITER '|' CSV HEADER ENCODING 'windows-1252';