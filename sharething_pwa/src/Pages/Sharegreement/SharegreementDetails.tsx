import React, { useEffect, useState } from 'react';
import { SubPageHeader } from '../../Components/Headers/SubPageHeader';
import { SharegreementModel } from '../../Entities/Interfaces';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';

interface SharegDetailsProps {
    fetchData: (id: string) => Promise<SharegreementModel>;
}

const SharegreementDetails: React.FC<SharegDetailsProps> = (props) => {
    const { fetchData: fetchSharegreement } = props;
    const { id } = useParams();
    const [sharegreement, setSharegreement] = useState<SharegreementModel | undefined>(undefined);

    useEffect(() => {
        if (id) {
            fetchSharegreement(id).then(shareg => {
                setSharegreement(shareg);
            });
        } else {
            throw new Error('ID missing');
        }

    }, []);

    return(
        <React.Fragment>
            {
                !sharegreement
                ? <Spin/>
                : (
                    <SubPageHeader title={sharegreement.itemName}/>
                )
            }
        </React.Fragment>
    );
};

export { SharegreementDetails };
