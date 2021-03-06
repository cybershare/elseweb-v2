package edu.utep.cybershare.elseweb.ontology.impl;

import edu.utep.cybershare.elseweb.ontology.*;

import java.util.Collection;

import org.protege.owl.codegeneration.WrappedIndividual;
import org.protege.owl.codegeneration.impl.WrappedIndividualImpl;
import org.semanticweb.owlapi.model.IRI;
import org.semanticweb.owlapi.model.OWLOntology;


/**
 * Generated by Protege (http://protege.stanford.edu).<br>
 * Source Class: DefaultBandIdentification <br>
 * @version generated on Thu Feb 13 13:45:51 GMT-07:00 2014 by nick
 */
public class DefaultBandIdentification extends WrappedIndividualImpl implements BandIdentification {

    public DefaultBandIdentification(OWLOntology ontology, IRI iri) {
        super(ontology, iri);
    }





    /* ***************************************************
     * Data Property http://ontology.cybershare.utep.edu/ELSEWeb/elseweb-data.owl#hasBandName
     */
     
    public Collection<? extends Object> getHasBandName() {
		return getDelegate().getPropertyValues(getOwlIndividual(), Vocabulary.DATA_PROPERTY_HASBANDNAME, Object.class);
    }

    public boolean hasHasBandName() {
		return !getHasBandName().isEmpty();
    }

    public void addHasBandName(Object newHasBandName) {
	    getDelegate().addPropertyValue(getOwlIndividual(), Vocabulary.DATA_PROPERTY_HASBANDNAME, newHasBandName);
    }

    public void removeHasBandName(Object oldHasBandName) {
		getDelegate().removePropertyValue(getOwlIndividual(), Vocabulary.DATA_PROPERTY_HASBANDNAME, oldHasBandName);
    }


}
