import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import * as process from 'process';
import { Resource } from '@opentelemetry/resources';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { KafkaJsInstrumentation } from 'opentelemetry-instrumentation-kafkajs';
import { HostMetrics } from '@opentelemetry/host-metrics';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { MeterProvider } from '@opentelemetry/sdk-metrics';
import { metrics } from '@opentelemetry/api';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

const prometheusExporter = new PrometheusExporter({
  port: Number(process.env?.METRICS_PORT ?? 9000),
  endpoint: process.env?.METRICS_EDNPOINT ?? '/metrics',
});

const meterProvider = new MeterProvider({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: process.env.SERVICE_NAME,
  }),
  readers: [prometheusExporter],
});

const hostMetrics = new HostMetrics({ meterProvider });
hostMetrics.start();

metrics.setGlobalMeterProvider(meterProvider);

const provider = new NodeTracerProvider({
  resource: Resource.default().merge(
    new Resource({
      [ATTR_SERVICE_NAME]: process.env.SERVICE_NAME,
    }),
  ),
});
provider.register();

registerInstrumentations({
  meterProvider,
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-nestjs-core': { enabled: true },
    }),
    new KafkaJsInstrumentation(),
  ],
});
